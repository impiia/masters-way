import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayService} from "src/service/WayService";

/**
 * Provides methods to interact with the WayPreview model
 */
export class WayPreviewDAL {

  /**
   * Get all WayPreview
   */
  public static async getWaysPreview(): Promise<WayPreview[]> {
    const waysDTO = await WayService.getWaysDTO();
    const usersPreview = await UserPreviewDAL.getUsersPreview();
    const goalsPreview = await GoalPreviewDAL.getGoalsPreview();

    const ownersPreview = waysDTO.map((wayDTO) => {
      const ownerPreview = usersPreview
      //TODO: task #114 Use hashmap instead of .find
        .find((elem) => elem.uuid === wayDTO.ownerUuid);
      if (!ownerPreview) {
        throw new Error(`${ownerPreview} was not found`);
      }

      return ownerPreview;
    });

    /**
     * Get currentMentors from currentMentorUuids for each way
     */
    const currentMentorsPreview = waysDTO.map((wayDTO) => {
      const currentMentorPreview = wayDTO.currentMentorUuids.map((uuid: string) => {
        const mentorsPreview = usersPreview
          //TODO: task #114 Use hashmap instead of .find
          .find((elem) => elem.uuid === uuid);
        if (!mentorsPreview) {
          throw new Error(`${mentorsPreview} was not found`);
        }

        return mentorsPreview;
      });

      return currentMentorPreview;
    });

    const goals = waysDTO.map((wayDTO) => {
      const goalPreview = goalsPreview
      //TODO: task #114 Use hashmap instead of .find
        .find((elem) => elem.uuid === wayDTO.goalUuid);
      if (!goalPreview) {
        throw new Error(`${goalPreview} was not found`);
      }

      return goalPreview;
    });

    /**
     * WayPreviewProps for each way separately
     */
    const getWayPreviewProps = (i: number) => {
      const obj = {
        owner: ownersPreview[i],
        currentMentors: currentMentorsPreview[i],
        goal: goals[i],
      };

      return obj;
    };

    const waysPreview = waysDTO
      .map((wayDTO, i) => wayDTOToWayPreviewConverter(wayDTO, getWayPreviewProps(i)));

    return waysPreview;
  }

  /**
   * Get User ways preview based of provided type
   */
  public static async getUserWaysPreview(uuid: string, type: "OwnWays" | "MentoringWays"): Promise<WayPreview[]> {

    let waysDTO;

    switch (type) {
      case "OwnWays":
        waysDTO = await WayService.getOwnWaysDTO(uuid);
        break;
      case "MentoringWays":
        waysDTO = await WayService.getMentoringWaysDTO(uuid);
        break;
    }

    const usersPreview = await UserPreviewDAL.getUsersPreview();
    const goalsPreview = await GoalPreviewDAL.getGoalsPreview();

    const ownersPreview = waysDTO.map((wayDTO) => {
      const ownerPreview = usersPreview
      //TODO: task #114 Use hashmap instead of .find
        .find((elem) => elem.uuid === wayDTO.ownerUuid);
      if (!ownerPreview) {
        throw new Error(`${ownerPreview} was not found`);
      }

      return ownerPreview;
    });

    /**
     * Get currentMentors from currentMentorUuids for each way
     */
    const currentMentorsPreview = waysDTO.map((wayDTO) => {
      const currentMentorPreview = wayDTO.currentMentorUuids.map((userUuid: string) => {
        const mentorsPreview = usersPreview
          //TODO: task #114 Use hashmap instead of .find
          .find((elem) => elem.uuid === userUuid);
        if (!mentorsPreview) {
          throw new Error(`${mentorsPreview} was not found`);
        }

        return mentorsPreview;
      });

      return currentMentorPreview;
    });

    const goals = waysDTO.map((wayDTO) => {
      const goalPreview = goalsPreview
      //TODO: task #114 Use hashmap instead of .find
        .find((elem) => elem.uuid === wayDTO.goalUuid);
      if (!goalPreview) {
        throw new Error(`${goalPreview} was not found`);
      }

      return goalPreview;
    });

    /**
     * WayPreviewProps for each way separately
     */
    const getWayPreviewProps = (i: number) => {
      const obj = {
        owner: ownersPreview[i],
        currentMentors: currentMentorsPreview[i],
        goal: goals[i],
      };

      return obj;
    };

    const waysPreview = waysDTO
    // Very slow function, should be improved in the future
      .map((wayDTO, i) => wayDTOToWayPreviewConverter(wayDTO, getWayPreviewProps(i)));

    return waysPreview;
  }

}