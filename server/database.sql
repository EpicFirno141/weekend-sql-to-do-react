CREATE TYPE complete AS ENUM('Complete', 'Incomplete');

CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(32) NOT NULL,
	"description" VARCHAR(128),
	"status" COMPLETE DEFAULT 'Incomplete'
);