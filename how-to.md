# A Few Things You Need to Know

## How to Build Localized Skins

1. Go to the root folder, where this document resides.
2. Run the build script.
    ```
    node scripts/build
    ```
Skins for each culture are generated under *build* folder.

## How to Add A New File

1. Author a new XML file under *GUI_USER.common* folder.
2. Test it!
3. Generate source (.src.xml) and resource (.json) files.
    ```
    node scripts/gentpl [xml-file-path] [generated-source-file-path] [generated-json-file-path]
    ```
    This will generate the corrspoding source and resource files under *src* and *resources/en-ca* folders respectively.

## How to Update An Existing File

There are two ways to accomplish this task:

1. Update the original XML file
2. Update the source and resource files

### Update the Original XML file
If you have not localized the corresponding resource file for any other culutres yet, you can safely update the original XML file and regenerate source and resource files.

### Update the Source and Resource Files
If you have already localizedthe corresponding resource file, you don't want to mess the existing localized resources by udpating the the resource identifiers generated.

In this case, update the source and resource file. If you update any string in the resource file, make sure that the corrspoding translations are updated for other cultures.
