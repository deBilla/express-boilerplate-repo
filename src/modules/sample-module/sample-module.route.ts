import {Request, Response, Router} from "express";
import {
  ResponseType,
  sendErrorResponse,
  sendSuccessResponse,
} from "../../core/models/response/response.model";
import {SampleModuleController} from "./sample-module.controller";
import {validateRequest} from "../../core/middlewares/validate-request";
import {SampleModuleSchema} from "./dto/sample-module-request.dto";

const sampleModuleRouter = Router();

const moduleController = new SampleModuleController();

sampleModuleRouter.post("/v1/", validateRequest(SampleModuleSchema), async (req: Request, res: Response) => {
  try {
    const sampleModuleRequest = req.body;

    const payload = await moduleController.createSampleModule(
      sampleModuleRequest,
    );

    return sendSuccessResponse({
      type: ResponseType.HTTP,
      statusCode: 200,
      payload: payload,
      res,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(error);
    return sendErrorResponse({
      type: ResponseType.HTTP,
      payload: err.message,
      res,
    });
  }
});

sampleModuleRouter.get("/v1/", async (req: Request, res: Response) => {
  try {
    const payload = await moduleController.getAll();

    return sendSuccessResponse({
      type: ResponseType.HTTP,
      statusCode: 200,
      payload: payload,
      res,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(err);
    return sendErrorResponse({
      type: ResponseType.HTTP,
      payload: err.message,
      res,
    });
  }
});

sampleModuleRouter.get("/v1/:uuid", async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;

    if (!uuid) {
      throw new Error("UUID is required.");
    }

    const payload = await moduleController.getOne(uuid);

    if (!payload) {
      throw new Error("Resource not found.");
    }

    return sendSuccessResponse({
      type: ResponseType.HTTP,
      statusCode: 200,
      payload: payload,
      res,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(err);
    return sendErrorResponse({
      type: ResponseType.HTTP,
      payload: err.message,
      res,
    });
  }
});


sampleModuleRouter.delete("/v1/:uuid", async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;

    if (!uuid) throw new Error("UUID needed");
    await moduleController.deleteSampleModule(uuid);

    return sendSuccessResponse({
      type: ResponseType.HTTP,
      statusCode: 200,
      payload: true,
      res,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(err);
    return sendErrorResponse({
      type: ResponseType.HTTP,
      payload: err.message,
      res,
    });
  }
});

export default sampleModuleRouter;
