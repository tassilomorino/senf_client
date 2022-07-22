export function generateErrorMessage(errorCode) {
  let errorMessage = "";
  switch (errorCode) {
    case "auth/invalid-email":
      errorMessage = "error_invalid_email_address";
      break;
    case "auth/user-disabled":
      errorMessage = "error_user_disabled";
      break;
    case "auth/user-not-found":
      errorMessage = "error_user_not_found";
      break;
    case "auth/wrong-password":
      errorMessage = "error_wrong_password";
      break;
    case "auth/email-already-in-use":
      errorMessage = "error_email_already_in_use";
      break;
    case "auth/weak-password":
      errorMessage = "error_weak_password";
      break;
    case "auth/invalid-credential":
      errorMessage = "error_invalid_crediantials";
      break;
    case "auth/operation-not-allowed":
      errorMessage = "error_operation_not_allowed";
      break;
    case "auth/requires-recent-login":
      errorMessage = "error_requires_recent_login";
      break;
    case "auth/too-many-requests":
      errorMessage = "error_too_many_requests";
      break;
    case "auth/user-token-expired":
      errorMessage = "error_user_token_expired";
      break;
    case "auth/invalid-user-token":
      errorMessage = "error_user_token_invalid";
      break;
    case "auth/network-request-failed":
      errorMessage = "error_network_request_failed";
      break;
    case "auth/user-not-verified":
      errorMessage = "error_user_not_verified";
      break;
    case "auth/username-exists":
      errorMessage = "error_username_already_exists";
      break;

    default:
      errorMessage = `Unknown error. ${errorCode}`;
  }
  return errorMessage;
}
