$destination = $(get-location).Path + "/src"
dotnet run --project code-generator -- $destination
prettier --write "src/**/*.ts"