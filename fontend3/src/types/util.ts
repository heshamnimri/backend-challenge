import { RouteConfig } from 'vue-router';

export type Weekday = 'Sunday' | 'Sun' | 'S'
                    | 'Monday' | 'Mon' | 'M'
                    | 'Tuesday' | 'Tue' | 'T'
                    | 'Wednesday' | 'Wed' | 'W'
                    | 'Thursday' | 'Thu'
                    | 'Friday' | 'Fri' | 'F'
                    | 'Saturday' | 'Sat';

export interface KanbanElement {
  id: string;
  name: string;
  colour: string;
}

export interface RouteAdd {
  routes: RouteConfig[];
  parentRoutePath: string | null;
}

export interface Snackbar {
  message: string;
  type: 'error' | 'success';
  duration: number;
}

export enum DeviceType {
  Mobile,
  Desktop
}

export enum Permission {
  Student,
  Employee,
  Customer
}

export enum LoadedState {
  Loaded, // data is valid
  Loading, // show loading bar
  Failed // show some error icon
}

// the following two types are used for picking properties out of an interface,
// and then renaming them. Used because the props sent from the backend may be
// a different name than we want
type UnionToIntersection<U> = // eslint-disable-next-line
(U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export type PickRenameMulti<T, K extends keyof T, R extends { [P in K]: PropertyKey }> =
  Omit<T, K> & UnionToIntersection<{ [P in K]: { [PP in R[P]]: T[P] } }[K]>

export type InterfaceOf<T> = {[P in keyof T]: T[P]}

// used to get a subset of a type: only required keys, or only optional keys
export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];
export type RequiredKeys<T> = Exclude<KeysOfType<T, Exclude<T[keyof T], undefined>>, undefined>;
export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
