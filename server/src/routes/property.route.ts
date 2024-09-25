import { Router } from "express";
import { addPropertyController } from "../controllers/property/addproperty.controller";
import { deletePropertyController } from "../controllers/property/deleteproperty";
import { updatePropertyController } from "../controllers/property/updateProperty";
import { getAllProperties } from "../controllers/property/getAllproperties";
import { getPropertiesWithUser } from "../controllers/property/getpropertywithuser";
import { getPropertyWithId } from "../controllers/property/getpropertywithId";

const propertyRoute = Router();

propertyRoute
  .route("/property")
  .post(addPropertyController)
  .delete(deletePropertyController)
  .put(updatePropertyController)
  .get(getAllProperties);
propertyRoute.get(`/withuser/:userId`, getPropertiesWithUser);
propertyRoute.get(`/:propertyId`, getPropertyWithId);
export default propertyRoute;
