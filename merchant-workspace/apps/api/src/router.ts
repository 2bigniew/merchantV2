import { Router } from "express";
import { accountRouter } from "./app/modules/account/controller";
import { companyRouter } from "./app/modules/company/controller";
import { customerRouter } from "./app/modules/customer/controller";
import { invoiceRouter } from "./app/modules/invoice/controller";

export const router = Router();

router.use("/account", accountRouter);
router.use("/company", companyRouter);
router.use("/customer", customerRouter);
router.use("/invoice", invoiceRouter);
