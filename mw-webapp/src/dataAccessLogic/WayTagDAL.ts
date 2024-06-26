import {
  DeleteWayTagRequest,
  SchemasWayTagResponse,
} from "src/apiAutogenerated";
import {WayTagService} from "src/service/WayTagService";

/**
 * Params for{@link WayTagDAL.addWayTagToWay}
 */
interface addWTagToWayParams {

  /**
   * Tag name
   */
  name: string;

  /**
   * Way uuid
   */
  wayUuid: string;
}

/**
 * Provides methods to interact with the way tags
 */
export class WayTagDAL {

  /**
   * Create way tag
   */
  public static async addWayTagToWay(params: addWTagToWayParams): Promise<SchemasWayTagResponse> {
    const wayTag = await WayTagService.addWayTagToWay({request: params});

    return wayTag;
  }

  /**
   * Delete way tag by UUID
   */
  public static async deleteWayTag(requestParameters: DeleteWayTagRequest): Promise<void> {
    await WayTagService.deleteWayTag(requestParameters);
  }

}

