// modules/shade-biometrics/index.ts
import { requireNativeModule } from 'expo-modules-core';

type Mod = { isAvailable(): boolean; authenticate(reason: string): Promise<boolean> };

export default requireNativeModule<Mod>('ShadeBiometrics');
