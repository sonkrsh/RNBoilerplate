#!/bin/bash

# React Native Project Renaming Script - COMPLETE END-TO-END RENAMING
# Usage: ./rename-project.sh "NewProjectName"

set -e

if [ -z "$1" ]; then
    echo "Error: Please provide a new project name"
    echo "Usage: ./rename-project.sh \"NewProjectName\""
    exit 1
fi

NEW_NAME="$1"
OLD_NAME="RNBoilerplate"
OLD_NAME_LOWER="rnboilerplate"
NEW_NAME_LOWER=$(echo "$NEW_NAME" | tr '[:upper:]' '[:lower:]')

echo "🚀 Starting COMPLETE project rename from '$OLD_NAME' to '$NEW_NAME'..."
echo "📝 This will update ALL references including bundle IDs, package names, and native configurations"

# Check if required tools are available
command -v sed >/dev/null 2>&1 || { echo "Error: sed is required but not installed."; exit 1; }

# 1. Update package.json
echo "📦 Updating package.json..."
sed -i.bak "s/\"name\": \"$OLD_NAME\"/\"name\": \"$NEW_NAME\"/g" package.json
sed -i.bak "s/\"displayName\": \"$OLD_NAME\"/\"displayName\": \"$NEW_NAME\"/g" package.json

# 2. Update app.json
echo "📱 Updating app.json..."
sed -i.bak "s/\"name\": \"$OLD_NAME\"/\"name\": \"$NEW_NAME\"/g" app.json
sed -i.bak "s/\"displayName\": \"$OLD_NAME\"/\"displayName\": \"$NEW_NAME\"/g" app.json

# 3. Update Android files COMPLETELY
echo "🤖 Updating Android configuration (ALL FILES)..."

# Update build.gradle - APPLICATION ID AND NAMESPACE
sed -i.bak "s/namespace \"com.$OLD_NAME_LOWER\"/namespace \"com.$NEW_NAME_LOWER\"/g" android/app/build.gradle
sed -i.bak "s/applicationId \"com.$OLD_NAME_LOWER\"/applicationId \"com.$NEW_NAME_LOWER\"/g" android/app/build.gradle

# Update strings.xml
sed -i.bak "s/<string name=\"app_name\">$OLD_NAME<\/string>/<string name=\"app_name\">$NEW_NAME<\/string>/g" android/app/src/main/res/values/strings.xml

# Update settings.gradle
sed -i.bak "s/rootProject.name = '$OLD_NAME'/rootProject.name = '$NEW_NAME'/g" android/settings.gradle

# Update Android Manifest files
find android -name "AndroidManifest.xml" -type f -exec sed -i.bak "s/com\.$OLD_NAME_LOWER/com.$NEW_NAME_LOWER/g" {} \;

# Update MainApplication.kt package
sed -i.bak "s/package com.$OLD_NAME_LOWER/package com.$NEW_NAME_LOWER/g" android/app/src/main/java/com/$OLD_NAME_LOWER/MainApplication.kt

# Update MainActivity.kt package and main component name
sed -i.bak "s/package com.$OLD_NAME_LOWER/package com.$NEW_NAME_LOWER/g" android/app/src/main/java/com/$OLD_NAME_LOWER/MainActivity.kt
sed -i.bak "s/getMainComponentName(): String = \"$OLD_NAME\"/getMainComponentName(): String = \"$NEW_NAME\"/g" android/app/src/main/java/com/$OLD_NAME_LOWER/MainActivity.kt

# Rename Android package directory
if [ -d "android/app/src/main/java/com/$OLD_NAME_LOWER" ]; then
    echo "📁 Renaming Android package directory..."
    mkdir -p "android/app/src/main/java/com/$NEW_NAME_LOWER"
    mv android/app/src/main/java/com/$OLD_NAME_LOWER/* "android/app/src/main/java/com/$NEW_NAME_LOWER/"
    rmdir "android/app/src/main/java/com/$OLD_NAME_LOWER"
fi

# 4. Update iOS files COMPLETELY
echo "🍎 Updating iOS configuration (ALL FILES)..."

# Update Info.plist - ALL references
sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" ios/$OLD_NAME/Info.plist

# Update AppDelegate.swift
sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" ios/$OLD_NAME/AppDelegate.swift

# Update LaunchScreen.storyboard
sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" ios/$OLD_NAME/LaunchScreen.storyboard

# Update Podfile
sed -i.bak "s/target '$OLD_NAME'/target '$NEW_NAME'/g" ios/Podfile

# Update ALL Xcode project files
sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" ios/$OLD_NAME.xcodeproj/project.pbxproj
sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" ios/$OLD_NAME.xcodeproj/xcshareddata/xcschemes/$OLD_NAME.xcscheme
sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" ios/$OLD_NAME.xcworkspace/contents.xcworkspacedata

# Update bundle identifier in project.pbxproj
sed -i.bak "s/com\.$OLD_NAME_LOWER/com.$NEW_NAME_LOWER/g" ios/$OLD_NAME.xcodeproj/project.pbxproj

# Rename iOS directories and files
echo "📁 Renaming iOS directories and files..."
if [ -d "ios/$OLD_NAME" ]; then
    mv "ios/$OLD_NAME" "ios/$NEW_NAME"
fi

if [ -d "ios/$OLD_NAME.xcodeproj" ]; then
    mv "ios/$OLD_NAME.xcodeproj" "ios/$NEW_NAME.xcodeproj"
fi

if [ -d "ios/$OLD_NAME.xcworkspace" ]; then
    mv "ios/$OLD_NAME.xcworkspace" "ios/$NEW_NAME.xcworkspace"
fi

# Rename scheme file
if [ -f "ios/$NEW_NAME.xcodeproj/xcshareddata/xcschemes/$OLD_NAME.xcscheme" ]; then
    mv "ios/$NEW_NAME.xcodeproj/xcshareddata/xcschemes/$OLD_NAME.xcscheme" "ios/$NEW_NAME.xcodeproj/xcshareddata/xcschemes/$NEW_NAME.xcscheme"
fi

# 5. Update environment files
echo "🔧 Updating environment files..."
for env_file in .env .env.development .env.qa .env.production; do
    if [ -f "$env_file" ]; then
        sed -i.bak "s/APP_NAME=$OLD_NAME/APP_NAME=$NEW_NAME/g" "$env_file"
        sed -i.bak "s/BUNDLE_ID=com\.$OLD_NAME_LOWER/BUNDLE_ID=com.$NEW_NAME_LOWER/g" "$env_file"
        sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" "$env_file"
    fi
done

# 6. Update config files
echo "⚙️ Updating config files..."
if [ -f "src/config/index.ts" ]; then
    sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" src/config/index.ts
fi

# 7. Update test files
echo "🧪 Updating test files..."
find . -name "*.test.*" -type f -not -path "./node_modules/*" -exec sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" {} \;

# 8. Update README.md
echo "📖 Updating README.md..."
if [ -f "README.md" ]; then
    sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" README.md
fi

# 9. Update Gemfile (for React Native CLI)
echo "💎 Updating Gemfile..."
if [ -f "Gemfile" ]; then
    sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" Gemfile
fi

# 10. Update jest.config.js
echo "🃏 Updating Jest configuration..."
if [ -f "jest.config.js" ]; then
    sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" jest.config.js
fi

# 11. Update package-lock.json
echo "📋 Updating package-lock.json..."
if [ -f "package-lock.json" ]; then
    sed -i.bak "s/\"name\": \"$OLD_NAME_LOWER\"/\"name\": \"$NEW_NAME_LOWER\"/g" package-lock.json
    sed -i.bak "s/$OLD_NAME/$NEW_NAME/g" package-lock.json
fi

# 12. Update any TypeScript/JavaScript files with hardcoded references
echo "📄 Updating source files with hardcoded references..."
find src -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i.bak "s/$OLD_NAME/$NEW_NAME/g"

# 13. Clean up ALL backup files
echo "🧹 Cleaning up backup files..."
find . -name "*.bak" -type f -delete

# 14. Clean Android and iOS build folders
echo "🧽 Cleaning build folders..."
if [ -d "android/app/build" ]; then
    echo "🗑️  Removing Android build folder..."
    rm -rf android/app/build
fi

if [ -d "ios/build" ]; then
    echo "🗑️  Removing iOS build folder..."
    rm -rf ios/build
fi

if [ -d "ios/DerivedData" ]; then
    echo "🗑️  Removing iOS DerivedData..."
    rm -rf ios/DerivedData
fi

echo ""
echo "✅ ✅ ✅ PROJECT COMPLETELY RENAMED from '$OLD_NAME' to '$NEW_NAME'! ✅ ✅ ✅"
echo ""
echo "🎯 EVERYTHING HAS BEEN UPDATED:"
echo "   ✅ Package name: $OLD_NAME_LOWER → $NEW_NAME_LOWER"
echo "   ✅ Display name: $OLD_NAME → $NEW_NAME"
echo "   ✅ Android package: com.$OLD_NAME_LOWER → com.$NEW_NAME_LOWER"
echo "   ✅ iOS bundle ID: com.$OLD_NAME_LOWER → com.$NEW_NAME_LOWER"
echo "   ✅ Native project files renamed"
echo "   ✅ Source code references updated"
echo "   ✅ Build configurations updated"
echo ""
echo "🔄 NEXT STEPS (REQUIRED):"
echo "1. npm install"
echo "2. cd ios && pod install"
echo "3. npx react-native start --reset-cache"
echo ""
echo "🏗️  CLEAN & REBUILD:"
echo "4. Android: cd android && ./gradlew clean"
echo "5. iOS: Open Xcode → Product → Clean Build Folder"
echo ""
echo "🚀 Your project is now renamed and ready to run!"