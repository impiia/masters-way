import {SchemasUserPlainResponse} from "src/apiAutogenerated";
import {WayStatusType} from "src/logic/waysTable/wayStatus";
import {DayReport} from "src/model/businessModel/DayReport";
import {Metric} from "src/model/businessModel/Metric";
import {UserPlain} from "src/model/businessModel/User";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {WayTag} from "src/model/businessModelPreview/WayTag";

/**
 * Way model
 */
export class Way {

  /**
   * Way's UUID
   */
  public uuid: string;

  /**
   * Way's name
   */
  public name: string;

  /**
   * Day reports
   */
  public dayReports: DayReport[];

  /**
   * Way's owner
   */
  public owner: SchemasUserPlainResponse;

  /**
   * Mentors of this way
   * @key @User.uuid
   * @value @UserPreview
   */
  public mentors: Map<string, UserPlain>;

  /**
   * Former mentors of this way
   * @key @User.uuid
   * @value @UserPreview
   */
  public formerMentors: Map<string, UserPlain>;

  /**
   * Users who sent request to become Way's mentor
   */
  public mentorRequests: UserPlain[];

  /**
   * Way's status "Completed", "In progress", "Abandoned"
   */
  public status: WayStatusType;

  /**
   * Last day when way was updated
   */
  public lastUpdate: Date;

  /**
   * Users for whom this way are favorite
   */
  public favoriteForUsersAmount: number;

  /**
   * Date when way was created
   */
  public createdAt: Date;

  /**
   * Way's tags {@link WayTag}
   */
  public wayTags: WayTag[];

  /**
   * Tags that was used for jobDone {@link JobTag}
   */
  public jobTags: JobTag[];

  /**
   * Way's uuid that was copied
   */
  public copiedFromWayUuid: string | null;

  /**
   * Description of goal
   */
  public goalDescription: string;

  /**
   * Estimation time for complete goal
   */
  public estimationTime: number;

  /**
   * Stringified metrics objects {@link MetricDTO}
   */
  public metrics: Metric[];

  /**
   * Is way private
   * @default false
   */
  public isPrivate: boolean;

  /**
   * If Way has children then this way is Composite
   */
  public children: Way[];

  constructor(wayData: Way) {
    this.uuid = wayData.uuid;
    this.name = wayData.name;
    this.dayReports = wayData.dayReports;
    this.owner = wayData.owner;
    this.mentors = wayData.mentors;
    this.mentorRequests = wayData.mentorRequests;
    this.status = wayData.status;
    this.lastUpdate = wayData.lastUpdate;
    this.favoriteForUsersAmount = wayData.favoriteForUsersAmount;
    this.createdAt = wayData.createdAt;
    this.wayTags = wayData.wayTags;
    this.jobTags = wayData.jobTags;
    this.formerMentors = wayData.formerMentors;
    this.copiedFromWayUuid = wayData.copiedFromWayUuid;
    this.goalDescription = wayData.goalDescription;
    this.estimationTime = wayData.estimationTime;
    this.metrics = wayData.metrics;
    this.isPrivate = wayData.isPrivate;
    this.children = wayData.children;
  }

}
