import ExpoModulesCore
import LocalAuthentication

public class ShadeBiometricsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ShadeBiometrics")

    Function("isAvailable") { () -> Bool in
      LAContext().canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: nil)
    }

    AsyncFunction("authenticate") { (reason: String, promise: Promise) in
      let ctx = LAContext()
      ctx.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) { ok, error in
        if let error { promise.reject("ERR_BIOMETRIC", error.localizedDescription) }
        else { promise.resolve(ok) }
      }
    }
  }
}
