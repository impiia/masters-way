// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: way_tags.query.sql

package db

import (
	"context"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

const createWayTag = `-- name: CreateWayTag :one
INSERT INTO way_tags(
    name
) VALUES (
    $1
) RETURNING uuid, name
`

func (q *Queries) CreateWayTag(ctx context.Context, name string) (WayTag, error) {
	row := q.queryRow(ctx, q.createWayTagStmt, createWayTag, name)
	var i WayTag
	err := row.Scan(&i.Uuid, &i.Name)
	return i, err
}

const getListWayTagsByWayId = `-- name: GetListWayTagsByWayId :many
SELECT 
    way_tags.uuid AS uuid,
    way_tags.name AS name
FROM way_tags
JOIN ways_way_tags ON ways_way_tags.way_tag_uuid = way_tags.uuid  
WHERE ways_way_tags.way_uuid = $1
ORDER BY name
`

func (q *Queries) GetListWayTagsByWayId(ctx context.Context, wayUuid uuid.UUID) ([]WayTag, error) {
	rows, err := q.query(ctx, q.getListWayTagsByWayIdStmt, getListWayTagsByWayId, wayUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []WayTag{}
	for rows.Next() {
		var i WayTag
		if err := rows.Scan(&i.Uuid, &i.Name); err != nil {
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

const getListWayTagsByWayIds = `-- name: GetListWayTagsByWayIds :many
SELECT 
    way_tags.uuid AS uuid,
    way_tags.name AS name,
    ways_way_tags.way_uuid
FROM way_tags
JOIN ways_way_tags ON ways_way_tags.way_tag_uuid = way_tags.uuid  
WHERE ways_way_tags.way_uuid = ANY($1::UUID[])
ORDER BY name
`

type GetListWayTagsByWayIdsRow struct {
	Uuid    uuid.UUID `json:"uuid"`
	Name    string    `json:"name"`
	WayUuid uuid.UUID `json:"way_uuid"`
}

func (q *Queries) GetListWayTagsByWayIds(ctx context.Context, dollar_1 []uuid.UUID) ([]GetListWayTagsByWayIdsRow, error) {
	rows, err := q.query(ctx, q.getListWayTagsByWayIdsStmt, getListWayTagsByWayIds, pq.Array(dollar_1))
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []GetListWayTagsByWayIdsRow{}
	for rows.Next() {
		var i GetListWayTagsByWayIdsRow
		if err := rows.Scan(&i.Uuid, &i.Name, &i.WayUuid); err != nil {
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

const getWayTagByName = `-- name: GetWayTagByName :one
SELECT uuid, name FROM way_tags
WHERE way_tags.name = $1
`

func (q *Queries) GetWayTagByName(ctx context.Context, name string) (WayTag, error) {
	row := q.queryRow(ctx, q.getWayTagByNameStmt, getWayTagByName, name)
	var i WayTag
	err := row.Scan(&i.Uuid, &i.Name)
	return i, err
}
