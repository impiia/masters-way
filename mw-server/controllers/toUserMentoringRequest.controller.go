package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type ToUserMentoringRequestController struct {
	db  *db.Queries
	ctx context.Context
}

func NewToUserMentoringRequestController(db *db.Queries, ctx context.Context) *ToUserMentoringRequestController {
	return &ToUserMentoringRequestController{db, ctx}
}

// Create userMentoringRequest handler
// @Summary Create a new userMentoringRequest
// @Description
// @Tags toUserMentoringRequest
// @ID create-userMentoringRequest
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateUserMentoringRequestPayload true "query params"
// @Success 200
// @Router /toUserMentoringRequests [post]
func (cc *ToUserMentoringRequestController) CreateToUserMentoringRequest(ctx *gin.Context) {
	var payload *schemas.CreateUserMentoringRequestPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &db.CreateToUserMentoringRequestParams{
		UserUuid: uuid.MustParse(payload.UserUuid),
		WayUuid:  uuid.MustParse(payload.WayUuid),
	}

	ToUserMentoringRequest, err := cc.db.CreateToUserMentoringRequest(ctx, *args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, ToUserMentoringRequest)
}

// Deleting ToUserMentoringRequest handlers
// @Summary Delete toUserMentoringReques by UUID
// @Description
// @Tags toUserMentoringRequest
// @ID delete-toUserMentoringRequest
// @Accept  json
// @Produce  json
// @Param userUuid path string true "user UUID"
// @Param wayUuid path string true "way UUID"
// @Success 200
// @Router /toUserMentoringRequests/{userUuid}/{wayUuid} [delete]
func (cc *ToUserMentoringRequestController) DeleteToUserMentoringRequestById(ctx *gin.Context) {
	userUuid := ctx.Param("userUuid")
	wayUuid := ctx.Param("wayUuid")

	args := db.DeleteToUserMentoringRequestByIdsParams{
		UserUuid: uuid.MustParse(userUuid),
		WayUuid:  uuid.MustParse(wayUuid),
	}

	err := cc.db.DeleteToUserMentoringRequestByIds(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
