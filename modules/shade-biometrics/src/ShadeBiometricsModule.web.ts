import { registerWebModule, NativeModule } from 'expo';

class ShadeBiometricsModule extends NativeModule<{}> {}

export default registerWebModule(ShadeBiometricsModule, 'ShadeBiometricsModule');
