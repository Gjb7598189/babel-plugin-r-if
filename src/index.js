// const babylon = require('babylon');
// const babylonJsx = require('babylon-jsx').default;
// const traverse = require('babel-traverse').default;
// const generate = require('babel-generator').default;
// const types = require('babel-types');
// const fs = require('fs')
// const path = require('path');
"use strict"
exports.__esModule = true;

exports.default = function({ types: t }) {
    return {
        visitor: {
            JSXAttribute(path) {
                if (path.node.name.name === 'r-if') {
                    const parent = path.findParent((path) => path.isJSXElement());
                    const item = parent.node.openingElement.name.name;
                    const left = t.identifier(path.node.value.expression.name);
                    const openingElement = t.JSXOpeningElement(t.JSXIdentifier(item), []);
                    const jsxClosingElement = t.JSXClosingElement(t.JSXIdentifier(item));
                    const child = parent.node.children;
                    const right = t.JSXElement(openingElement, jsxClosingElement, child, false);
                    if (parent.parent.type === 'JSXElement') { // code1类型
                        const LogicalExpression = t.LogicalExpression('&&', left, right);
                        const JSXExpressionContainer = t.JSXExpressionContainer(LogicalExpression);
                        parent.replaceWith(JSXExpressionContainer);
                    } else if (parent.parent.type === 'ReturnStatement') { // code2类型
                        const left = t.identifier(path.node.value.expression.name);
                        const LogicalExpression = t.logicalExpression('&&', left, right);
                        parent.replaceWith(LogicalExpression);
                    }
                }
                return false;
            }
        }
    }
}
module.exports = exports;