using System;
using System.Linq;

namespace CodeGenerator.Types
{
    class TypescriptEnum : TypescriptClass
    {
        public TypescriptEnum(Type type) : base(type) { }

        protected override Func<string> CreateClassDeclaration()
        {
            var values = Enum.GetValues(Type).Cast<object>().Select(value => $"\t{value} = \"{value}\"");
            return () => $"export enum {Type.Name} {{\n{string.Join(",\n", values)}\n}}";
        }
    }
}