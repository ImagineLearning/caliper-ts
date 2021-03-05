using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using ImsGlobal.Caliper.Entities;

namespace CodeGenerator
{
    static class __TypescriptExtensions
    {
        static Regex specialCharacterRegex = new Regex(@"[^\w_]");

        public static string[] GetNames(this Type type) => type.FullName.Split('.').Last().Split('+');

        public static string GetTypescriptName(this Type type) => type.FullName.Split('.').Last().Replace("+", "");

        public static string GetRelativeDirectory(this Type type, Type targetType)
        {
            var source = type.Namespace.Split('.').ToList();
            var target = targetType.Namespace.Split('.').ToList();
            while (target.Any() && source.Any())
            {
                if (target.FirstOrDefault() == source.FirstOrDefault())
                {
                    target.RemoveAt(0);
                    source.RemoveAt(0);
                }
                else
                    break;
            }

            var pathBuilder = new StringBuilder("./");
            source.ForEach(_ => pathBuilder.Append("../"));
            target.ForEach(_ => pathBuilder.Append(_ + "/"));
            return pathBuilder.ToString();
        }

        public static object IsDefault(this Type type)
        {
            var defaultValue = type.IsValueType ? Activator.CreateInstance(type) : null;
            return defaultValue;
        }

        public static string ToCamelCase(this string text)
        {
            return specialCharacterRegex.Match(text).Success ? $"[\"{text}\"]" : $"{char.ToLower(text[0])}{text.Substring(1)}";
        }

        public static bool IsDefault(this object value)
        {
            if(value == null)
                return true;

            var type = value.GetType();
            var defaultValue = type.IsValueType ? Activator.CreateInstance(type) : null;
            return value == defaultValue;
        }

        public static string ToCodeText(this object value)
        {
            if (value == null)
                return null;

            var valueType = value.GetType();
            if (valueType.IsEnum)
                return $"{valueType.Name}.{value}";

            if (valueType == typeof(string))
                return $"\"{value}\"";

            if (valueType == typeof(Guid))
                return "Caliper.uuid()";

            if (valueType == typeof(DateTime) || valueType == typeof(DateTimeOffset))
                return "Caliper.timestamp()";

            if (valueType == typeof(SoftwareApplication))
                return "Caliper.edApp()";

            if (typeof(IEnumerable).IsAssignableFrom(valueType))
                return $"[{string.Join(", ", (value as IEnumerable).OfType<object>().Select(_ => _.ToCodeText()))}]";

            if (valueType == typeof(bool))
                return value.ToString().ToLower();

            return value.ToString();
        }
    }
}