import {SchemasWayPlainResponse} from "src/apiAutogenerated";
import {getWayStatus} from "src/logic/waysTable/wayStatus";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Convert {@link SchemasWayPlainResponse} to {@link WayPreview}
 */
export const wayPlainDTOToWayPreview = (wayDTO: SchemasWayPlainResponse): WayPreview => {
  const status = getWayStatus({
    status: wayDTO.isCompleted ? "Completed" : null,
    lastUpdate: new Date(wayDTO.updatedAt),
  });

  // TODO: #856 Interface segregation: replace (mentor with stub fields) with shortMentor model
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
  });
};
