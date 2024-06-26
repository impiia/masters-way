package controllers

import (
	"context"
	"database/sql"
	"net/http"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/samber/lo"
)

type PlanController struct {
	db  *db.Queries
	ctx context.Context
}

func NewPlanController(db *db.Queries, ctx context.Context) *PlanController {
	return &PlanController{db, ctx}
}

// Create Plan handler
// @Summary Create a new plan
// @Description
// @Tags plan
// @ID create-plan
// @Accept  json
// @Produce  json
// @Param request body schemas.CreatePlanPayload true "query params"
// @Success 200 {object} schemas.PlanPopulatedResponse
// @Router /plans [post]
func (cc *PlanController) CreatePlan(ctx *gin.Context) {
	var payload *schemas.CreatePlanPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.CreatePlanParams{
		Description:   payload.Description,
		Time:          int32(payload.Time),
		OwnerUuid:     uuid.MustParse(payload.OwnerUuid),
		IsDone:        payload.IsDone,
		DayReportUuid: uuid.MustParse(payload.DayReportUuid),
		CreatedAt:     now,
		UpdatedAt:     now,
	}

	plan, err := cc.db.CreatePlan(ctx, *args)
	util.HandleErrorGin(ctx, err)

	response := schemas.PlanPopulatedResponse{
		Uuid:          plan.Uuid.String(),
		CreatedAt:     plan.CreatedAt.String(),
		UpdatedAt:     plan.UpdatedAt.String(),
		Description:   plan.Description,
		Time:          plan.Time,
		OwnerUuid:     plan.OwnerUuid.String(),
		OwnerName:     plan.OwnerName,
		IsDone:        plan.IsDone,
		DayReportUuid: plan.DayReportUuid.String(),
		Tags:          make([]schemas.JobTagResponse, 0),
	}

	ctx.JSON(http.StatusOK, response)
}

// Update Plan handler
// @Summary Update plan by UUID
// @Description
// @Tags plan
// @ID update-plan
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdatePlanPayload true "query params"
// @Param planId path string true "plan UUID"
// @Success 200 {object} schemas.PlanPopulatedResponse
// @Router /plans/{planId} [patch]
func (cc *PlanController) UpdatePlan(ctx *gin.Context) {
	var payload *schemas.UpdatePlanPayload
	PlanId := ctx.Param("planId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.UpdatePlanParams{
		Uuid:        uuid.MustParse(PlanId),
		UpdatedAt:   sql.NullTime{Time: now, Valid: true},
		Description: sql.NullString{String: payload.Description, Valid: payload.Description != ""},
		Time:        sql.NullInt32{Int32: int32(payload.Time), Valid: payload.Time != 0},
		IsDone:      sql.NullBool{Bool: payload.IsDone, Valid: true},
	}

	plan, err := cc.db.UpdatePlan(ctx, *args)
	util.HandleErrorGin(ctx, err)

	tagUuids := lo.Map(plan.TagUuids, func(stringifiedUuid string, i int) uuid.UUID {
		return uuid.MustParse(stringifiedUuid)
	})

	dbTags, err := cc.db.GetListLabelsByLabelUuids(ctx, tagUuids)
	util.HandleErrorGin(ctx, err)
	tags := lo.Map(dbTags, func(dbTag db.JobTag, i int) schemas.JobTagResponse {
		return schemas.JobTagResponse{
			Uuid:        dbTag.Uuid.String(),
			Name:        dbTag.Name,
			Description: dbTag.Description,
			Color:       dbTag.Color,
		}
	})

	response := schemas.PlanPopulatedResponse{
		Uuid:          plan.Uuid.String(),
		CreatedAt:     plan.CreatedAt.String(),
		UpdatedAt:     plan.UpdatedAt.String(),
		Description:   plan.Description,
		Time:          plan.Time,
		OwnerUuid:     plan.OwnerUuid.String(),
		OwnerName:     plan.OwnerName,
		IsDone:        plan.IsDone,
		DayReportUuid: plan.DayReportUuid.String(),
		Tags:          tags,
	}

	ctx.JSON(http.StatusOK, response)
}

// Deleting Plan handlers
// @Summary Delete plan by UUID
// @Description
// @Tags plan
// @ID delete-plan
// @Accept  json
// @Produce  json
// @Param planId path string true "plan ID"
// @Success 200
// @Router /plans/{planId} [delete]
func (cc *PlanController) DeletePlanById(ctx *gin.Context) {
	planId := ctx.Param("planId")

	err := cc.db.DeletePlan(ctx, uuid.MustParse(planId))
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
