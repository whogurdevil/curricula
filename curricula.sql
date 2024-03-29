CREATE TABLE "organization" (
  "name" varchar PRIMARY KEY,
  "vision" text,
  "mission" text
);

CREATE TABLE "department" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar,
  "vision" text,
  "mission" text,
  "organization" name,
  "head" varchar
);

CREATE TABLE "program" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar,
  "owner" varchar,
  "description" text
);

CREATE TABLE "curriculum" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar,
  "departmentId" integer,
  "programId" integer,
  "from" date,
  "to" date
);

CREATE TABLE "po" (
  "id" integer PRIMARY KEY,
  "programId" integer,
  "content" text
);

CREATE TABLE "course" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "code" varchar,
  "title" varchar,
  "coreElective" varchar,
  "credits" integer,
  "totalMarks" integer,
  "courseOwnerId" integer,
  "type" varchar,
  "departmentId" integer,
  "hours" integer,
  "totalmarks" integer,
  "curriculumId" integer
);

CREATE TABLE "teacher" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "departmentId" integer,
  "qualification" varchar,
  "expierence" int,
  "email" varchar,
  "password" varchar
);

CREATE TABLE "co" (
  "id" integer PRIMARY KEY,
  "courseId" integer,
  "content" text,
  "bloomsLevel" varchar
);

CREATE TABLE "copomaping" (
  "id" integer PRIMARY KEY,
  "coId" integer,
  "poId" integer
);

COMMENT ON COLUMN "course"."coreElective" IS 'core or elective';

COMMENT ON COLUMN "course"."type" IS 'theory or practical';

ALTER TABLE "curriculum" ADD FOREIGN KEY ("programId") REFERENCES "program" ("id");

ALTER TABLE "curriculum" ADD FOREIGN KEY ("departmentId") REFERENCES "department" ("id");

ALTER TABLE "po" ADD FOREIGN KEY ("id") REFERENCES "program" ("id");

ALTER TABLE "department" ADD FOREIGN KEY ("organization") REFERENCES "organization" ("name");

ALTER TABLE "course" ADD FOREIGN KEY ("departmentId") REFERENCES "department" ("id");

ALTER TABLE "course" ADD FOREIGN KEY ("curriculumId") REFERENCES "curriculum" ("id");

ALTER TABLE "teacher" ADD FOREIGN KEY ("departmentId") REFERENCES "department" ("id");
