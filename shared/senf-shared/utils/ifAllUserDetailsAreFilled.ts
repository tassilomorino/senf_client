import { DocumentData } from "firebase/firestore";

// interface for User
interface User extends DocumentData {
  handle?: string;
  description?: string;
  age?: string;
  postcode?: string;
  sex?: string; // shouldn't it be gender?
}

export function ifAllUserDetailsAreFilled(user: User | null): boolean {
  if (
    !user ||
    !user.handle?.length ||
    !user.description?.length ||
    !user.postcode?.length ||
    !user.age?.length ||
    !user.sex?.length
  )
    return false;
  return true;
}
