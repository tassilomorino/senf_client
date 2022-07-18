export function generateErrorMessage(errorCode) {
  let errorMessage = "";
  switch (errorCode) {
    case "auth/invalid-email":
      errorMessage = "Invalid email address.";
      break;
    case "auth/user-disabled":
      errorMessage = "User has been disabled.";
      break;
    case "auth/user-not-found":
      errorMessage = "User not found.";
      break;
    case "auth/wrong-password":
      errorMessage = "Wrong password.";
      break;
    case "auth/email-already-in-use":
      errorMessage = "Email already in use.";
      break;
    case "auth/weak-password":
      errorMessage = "Password is too weak.";
      break;
    case "auth/invalid-credential":
      errorMessage = "Invalid credential.";
      break;
    case "auth/operation-not-allowed":
      errorMessage = "Operation not allowed.";
      break;
    case "auth/requires-recent-login":
      errorMessage =
        "This operation is sensitive and requires recent authentication. Log in again before retrying this request.";
      break;
    case "auth/too-many-requests":
      errorMessage = "Too many requests have been sent.";
      break;
    case "auth/user-token-expired":
      errorMessage = "User token expired.";
      break;
    case "auth/invalid-user-token":
      errorMessage = "Invalid user token.";
      break;

    default:
      errorMessage = `Unknown error.${errorCode}`;
  }
  return errorMessage;
}
