// interface for User
interface User {
  handle: string | null;
  description: string | null;
  age: string | null;
  zipcode: string | null;
}

export function ifAllUserDetailsAreFilled(user: User): boolean {
  if (
    user?.handle &&
    user?.handle.length > 0 &&
    user?.description &&
    user?.description?.length > 0 &&
    user?.zipcode &&
    user?.zipcode?.length > 0 &&
    user?.age &&
    user?.age?.length > 0 &&
    user?.sex &&
    user?.sex?.length > 0
  ) {
    return true;
  }
  return false;
}
