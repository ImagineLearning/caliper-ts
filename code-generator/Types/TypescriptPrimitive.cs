using System;

namespace CodeGenerator.Types
{
    class TypescriptPrimitive : TypescriptClass
    {
        public static TypescriptPrimitive Object { get; } = new TypescriptPrimitive(typeof(object), "any");

        public static TypescriptPrimitive String { get; } = new TypescriptPrimitive(typeof(string), "string");

        public static TypescriptPrimitive Number { get; } = new TypescriptPrimitive(typeof(long), "number");

        public static TypescriptPrimitive Boolean { get; } = new TypescriptPrimitive(typeof(bool), "boolean");

        public TypescriptPrimitive(Type type, string name) : base(type, name) { }
    }
}