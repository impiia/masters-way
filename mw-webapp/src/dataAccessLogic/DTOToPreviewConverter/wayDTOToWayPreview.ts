import {SchemasWayPopulatedResponse} from "src/apiAutogenerated";
import {getWayStatus} from "src/logic/waysTable/wayStatus";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Convert {@link SchemasWayPlainResponse} to {@link WayPreview}
 */
export const wayDTOToWayPreview = (wayDTO: SchemasWayPopulatedResponse): WayPreview => {
  const status = getWayStatus({
    status: wayDTO.isCompleted ? "Completed" : null,
    lastUpdate: new Date(wayDTO.updatedAt),
  });

  const mentors = wayDTO.mentors.map((mentor) => new UserPreview({
    ...mentor,
    customWayCollections: [],
    favoriteForUserUuids: [],
    favoriteUserUuids: [],
    tags: [],
    wayRequests: [],
    createdAt: new Date(mentor.createdAt),
    imageUrl: mentor.imageUrl ?? "",
  }));

  return new WayPreview({
    ...wayDTO,
    status,
    createdAt: new Date(wayDTO.createdAt),
    lastUpdate: new Date(wayDTO.updatedAt),
    mentors,
    metricsDone: wayDTO.metrics.filter((metric) => metric.isDone).length,
    metricsTotal: wayDTO.metrics.length,
    dayReportsAmount: wayDTO.dayReports.length,
    favoriteForUsers: wayDTO.favoriteForUsersAmount,
  });
};
