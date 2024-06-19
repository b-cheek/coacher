// AutolinkedNativeModules.g.cpp contents generated by "react-native autolink-windows"
// clang-format off
#include "pch.h"
#include "AutolinkedNativeModules.g.h"

// Includes from @dr.pogodin/react-native-fs
#include <winrt/ReactNativeFs.h>

// Includes from @react-native-async-storage/async-storage
#include <winrt/ReactNativeAsyncStorage.h>

// Includes from react-native-screens
#include <winrt/RNScreens.h>

namespace winrt::Microsoft::ReactNative
{

void RegisterAutolinkedNativeModulePackages(winrt::Windows::Foundation::Collections::IVector<winrt::Microsoft::ReactNative::IReactPackageProvider> const& packageProviders)
{ 
    // IReactPackageProviders from @dr.pogodin/react-native-fs
    packageProviders.Append(winrt::ReactNativeFs::ReactPackageProvider());
    // IReactPackageProviders from @react-native-async-storage/async-storage
    packageProviders.Append(winrt::ReactNativeAsyncStorage::ReactPackageProvider());
    // IReactPackageProviders from react-native-screens
    packageProviders.Append(winrt::RNScreens::ReactPackageProvider());
}

}
