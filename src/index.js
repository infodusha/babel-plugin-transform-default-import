module.exports = function({ types: t }) {
    return {
        name: 'transform default import',
        visitor: {
            ImportDeclaration(path, state) {
                const specifiers = path.node.specifiers;
                const defaultSpecifier = specifiers.find(specifier => t.isImportDefaultSpecifier(specifier));
                if (!defaultSpecifier || path.node.source.value.indexOf('.') !== -1)
                    return;
                if (specifiers.find(specifier => t.isImportSpecifier(specifier)))
                    return;
                const namespaceSpecifier = specifiers.find(specifier => t.isImportNamespaceSpecifier(specifier));
                const name = defaultSpecifier.local.name;
                const defaultAppender = state.opts.default || '__DEFAULT__';
                const namespaceAppender = state.opts.namespace || '__NAMESPACE__';
                const defaultName = t.identifier(name + defaultAppender);
                const defaultSpecifierNew = t.importDefaultSpecifier(defaultName);
                const namedName = t.identifier(namespaceSpecifier ? namespaceSpecifier.local.name : name + namespaceAppender);;
                const defaulSpecifierIndex = specifiers.findIndex(specifier => specifier === defaultSpecifier);
                if (!namespaceSpecifier) {
                    const namespaceSpecifier = t.importNamespaceSpecifier(namedName);
                    path.node.specifiers.splice(defaulSpecifierIndex, 1, defaultSpecifierNew, namespaceSpecifier);
                } else {
                    path.node.specifiers.splice(defaulSpecifierIndex, 1, defaultSpecifierNew);
                }
                const revertModule = t.logicalExpression('||', defaultName, namedName);
                const revertVariable = t.VariableDeclaration("const", [t.VariableDeclarator(t.identifier(name), revertModule)]);
                path.insertAfter(revertVariable);
            }
        }
    };
  }