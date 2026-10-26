import { NativeModule, requireNativeModule } from 'expo';

declare class ShadeBiometricsModule extends NativeModule<{}> {}

export default requireNativeModule<ShadeBiometricsModule>('ShadeBiometrics');
