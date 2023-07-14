package main

import (
	"context"
	"fmt"
	"log"
	"server/config"
	"server/db"
)

type Item struct {
	Name  string `bson:"name"`
	Value int    `bson:"value"`
}

func main() {
	ctx := context.Background()

	c, err := config.GetConf("config.yml")
	if err != nil {
		panic(err)
	}

	databaseService, err := db.NewDatabaseService(ctx, c.Database.Connection, c.Database.Username, c.Database.Password)
	if err != nil {
		panic(err)
	}
	defer databaseService.Client().Disconnect(ctx)

	collection := databaseService.Client().Database("testdb").Collection("items")

	item := Item{"apple", 5}
	insertResult, err := collection.InsertOne(ctx, item)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted item with ID:", insertResult.InsertedID)
}
