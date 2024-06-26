// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: day_reports.query.sql

package db

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
)

const createDayReport = `-- name: CreateDayReport :one
INSERT INTO day_reports(
    way_uuid,
    created_at,
    updated_at,
    is_day_off
) VALUES (
    $1, $2, $3, $4
) RETURNING uuid, way_uuid, created_at, updated_at, is_day_off
`

type CreateDayReportParams struct {
	WayUuid   uuid.UUID `json:"way_uuid"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	IsDayOff  bool      `json:"is_day_off"`
}

func (q *Queries) CreateDayReport(ctx context.Context, arg CreateDayReportParams) (DayReport, error) {
	row := q.queryRow(ctx, q.createDayReportStmt, createDayReport,
		arg.WayUuid,
		arg.CreatedAt,
		arg.UpdatedAt,
		arg.IsDayOff,
	)
	var i DayReport
	err := row.Scan(
		&i.Uuid,
		&i.WayUuid,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.IsDayOff,
	)
	return i, err
}

const getListDayReportsByWayUuid = `-- name: GetListDayReportsByWayUuid :many
SELECT uuid, way_uuid, created_at, updated_at, is_day_off FROM day_reports
WHERE day_reports.way_uuid = $1
ORDER BY day_reports.created_at DESC
`

func (q *Queries) GetListDayReportsByWayUuid(ctx context.Context, wayUuid uuid.UUID) ([]DayReport, error) {
	rows, err := q.query(ctx, q.getListDayReportsByWayUuidStmt, getListDayReportsByWayUuid, wayUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []DayReport{}
	for rows.Next() {
		var i DayReport
		if err := rows.Scan(
			&i.Uuid,
			&i.WayUuid,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.IsDayOff,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateDayReport = `-- name: UpdateDayReport :one
UPDATE day_reports
SET
updated_at = coalesce($1, updated_at),
is_day_off = coalesce($2, is_day_off)
WHERE uuid = $3
RETURNING uuid, way_uuid, created_at, updated_at, is_day_off
`

type UpdateDayReportParams struct {
	UpdatedAt sql.NullTime `json:"updated_at"`
	IsDayOff  sql.NullBool `json:"is_day_off"`
	Uuid      uuid.UUID    `json:"uuid"`
}

func (q *Queries) UpdateDayReport(ctx context.Context, arg UpdateDayReportParams) (DayReport, error) {
	row := q.queryRow(ctx, q.updateDayReportStmt, updateDayReport, arg.UpdatedAt, arg.IsDayOff, arg.Uuid)
	var i DayReport
	err := row.Scan(
		&i.Uuid,
		&i.WayUuid,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.IsDayOff,
	)
	return i, err
}
