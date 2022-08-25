export const mainPaths = {
  main: "/",
  account: "/account",
  company: "/company",
  customer: "/customer",
  invoice: "/invoice"
};

export const accountPaths = {
  create: `${mainPaths.account}/create`,
  login: `${mainPaths.account}/login`,
  details: (id: number) => `${mainPaths.account}/${id}/details`,
  edit: (id: number) => `${mainPaths.account}/${id}/edit`,
  list: `${mainPaths.account}/list`
};
