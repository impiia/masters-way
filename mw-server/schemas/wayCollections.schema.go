package schemas

type CreateWayCollectionPayload struct {
	Name      string `json:"name" validate:"required"`
	OwnerUuid string `json:"ownerUuid" validate:"required"`
}

type UpdateWayCollectionPayload struct {
	Name string `json:"name"`
}

type WayCollectionPopulatedResponse struct {
	Uuid      string             `json:"uuid" validate:"required"`
	Name      string             `json:"name" validate:"required"`
	Ways      []WayPlainResponse `json:"ways" validate:"required"`
	CreatedAt string             `json:"createdAt" validate:"required"`
	UpdatedAt string             `json:"updatedAt" validate:"required"`
	OwnerUuid string             `json:"ownerUuid" validate:"required"`
	// should be removed after separation custom collections and default pseudocollections
	Type string `json:"type" validate:"required"`
}

type DefaultWayCollections struct {
	Own       WayCollectionPopulatedResponse `json:"own" validate:"required"`
	Favorite  WayCollectionPopulatedResponse `json:"favorite" validate:"required"`
	Mentoring WayCollectionPopulatedResponse `json:"mentoring" validate:"required"`
}

type WayCollectionPlainResponse struct {
	Uuid string `json:"uuid" validate:"required"`
	Name string `json:"name" validate:"required"`
}
