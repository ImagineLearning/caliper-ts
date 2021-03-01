$destination = $(get-location).Path + "/src"
remove-item ($destination + "/Events") -force -recurse
remove-item ($destination + "/Entities") -force -recurse

dotnet run --project code-generator -- $destination
prettier --write "src/**/*.ts"