import {Dictionary} from '../../core/types/dictionary.model';
import {ThreadCategory} from '../models/thread-category.model';

export enum RouteCategoryId {
  ARCH = 'arch',
  BIO = 'bio',
  BUD = 'bud',
  CHEM = 'chem',
  ELEC = 'elec',
  IT = 'it',
  MATH = 'math',
  MECH = 'mech',
  MED = 'med',
  PHYS = 'phys',
}

export const threadCategoryByRouteId: Dictionary<ThreadCategory> = {
  [RouteCategoryId.ARCH]: ThreadCategory.ARCH,
  [RouteCategoryId.BIO]: ThreadCategory.BIO,
  [RouteCategoryId.BUD]: ThreadCategory.BUD,
  [RouteCategoryId.CHEM]: ThreadCategory.CHEM,
  [RouteCategoryId.ELEC]: ThreadCategory.ELEC,
  [RouteCategoryId.IT]: ThreadCategory.IT,
  [RouteCategoryId.MATH]: ThreadCategory.MATH,
  [RouteCategoryId.MECH]: ThreadCategory.MECH,
  [RouteCategoryId.MED]: ThreadCategory.MED,
  [RouteCategoryId.PHYS]: ThreadCategory.PHYS,
};

