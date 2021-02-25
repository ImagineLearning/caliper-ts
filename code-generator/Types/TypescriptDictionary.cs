using System;
using System.Linq;

namespace CodeGenerator.Types
{
    class TypescriptDictionary : TypescriptClass
    {
        public TypescriptDictionary(Type type, TypescriptClassCollection userTypes) : base(type)
        {
            var typeArguments = type.GenericTypeArguments;
            while (!typeArguments.Any())
                typeArguments = (type = type.BaseType).GenericTypeArguments;

            var typeNames = typeArguments.Select(generic => FromType(generic, userTypes).Name);
            name = $"Record<{string.Join(", ", typeNames)}>";
        }
    }
}