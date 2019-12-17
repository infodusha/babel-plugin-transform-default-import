# babel-plugin-transform-default-import

Transforms default import into namespace import (for libs).

```javascript
import apollo from "apollo-server";
```

transform to

```javascript
import apollo__DEFAULT__, * as apollo__NAMESPACE__ from "apollo-server";
const apollo = apollo__DEFAULT__ || apollo__NAMESPACE__;
```

## Motivation
Node v. 13.2.0 intorduced support of ES modules, but tools like _jest_ use its own _require_ and use babel for support esm.
Native modules import commonjs only with default import, but babel uses named import for libs and it all conflicts.
This plugin solves this problem.

## Installation

```cmd
npm i --save-dev babel-plugin-transform-default-import
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
    "plugins": ["transform-default-import", {
        "default": "__DEFAULT__",
        "namespace": "__NAMESPACE__"
    }]
}
```

### Via `package.json`

```json
{
    "babel": {
        "plugins": ["transform-default-import", {
            "default": "__DEFAULT__",
            "namespace": "__NAMESPACE__"
        }]
    }
}
```
