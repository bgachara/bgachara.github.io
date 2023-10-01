---
title: Postgres
description: Reference notes on Postgres.
date: 2023-08-01
tags:
  - postgres
  - database
  - admin

---

### Configuration Files.

- postgresql.conf
    - controls general settings, such as memory location, default storage location for new databases, the IP addresses that Postgresql listens on, location of logs and plenty more.
    - controls life-sustaining settings of the Postgres server.
    - one can override settings at the database, role, session and even function levels.
    - preferred to edit the *postgres.auto.conf* for custom settings.
- pg_hba.conf
    - controls access to the server, dictating which users can log in to which databases, which IP addresses can connect and which authentication scheme to accept.
    - dictates the authentication protocol client must follow.
    - 
- pg_ident.conf
    - if present, this file maps an authenticated OS login to a PostgreSQL user.

```sql

Postgres officially refers to users as roles. Not all roles need to have to have login privileges.

Postmaster(represents the postgresql service and affect the whole server) vs User constext.

After postgresql install, you should log in as postgres and create other roles.

create role le login password 'king' createdb;
create role le login password 'king' superuser;

```

- Settings with user or superuser context can be set for a specific database, user, session and function level.
- Important Network settings to watch(change requires a server restart):
    - listen_addresses
    - port
    - max_connections
    - log_destination
- Settings to tweak for better performance:
    - shared_buffers
    - effective_cache_size
    - work_mem
    - maintenance_Work_mem
- Creating group roles and add members to it.

## Tablespaces

 - determine physical data layout.
 - virtually a directory in a file system
 - can distribute data across tablespaces per access i.e archive or active data.
 - can be used by more than one database and DB can store across TSs.
 - each db has a default tablespace.

## Files and Forks

 - All information related with a relation is stored in several different forks, each containing data of a particular type.
 - (oid) numeric filename id of a fork file.

## Pages

 - all files are logically split into pages which represent the minimum amount of data that can be read or written.
 - usually 8KB.
 - only configurable on build time...upto 32KB.

## TOAST
 
 - The Oversized Attributes Storage Technique.
 - fit long rows into pages.
 - plain, extended, external, main.

## Processes and Memory

 - Postmaster...spawner of processes.
 - startup, autovacuum, checkpointer, wal writer, writer, wal sender, wal receiver, stats collector
 - clients and connection management...postmaster.

## Database Creation

- Postgres uses a client/server model.
    - server process(postgres): manages the db files, accepts connections, perform db actions.
    - client process: app that wants to perform db actions.
- They can be on different hosts and communicate over a tcp/ip network. 

```sql

create database db_name;

```

- Existence of template databases that act as skeleton for new databases.
- You can use any database as a template, useful when you want to make replicas.
- You can make a db as a template after which it is no lonegr editable and deletable.

```sql

create database db_name template template_db_name;

update pg_database set datistemplate = true where datname = 'db_name';

```
## Schemas

- schemas organize your database into logical groups.
- schemas created to also house extensions.

## Privileges

- Permissions, this can bored down to row and column level.
- Types:
    - Select, Insert, Update, Alter, Execute, Delete and Truncate.
- Most privileges must have a context.

## Getting Started

- Should have one superuser whose passwd is known: 'postgres'
- Postgresql creates one superuser and db at installation both called postgres.
- Before creating a db, create a role that will own that db

```sql

create role new_role login password 'new_pass';

```
- Create db and set the owner.

```sql

create database mydb with owner = new_role;

```

- GRANT command is the primary means to assign privileges.
- Owner of an object retains all privileges.

```sql
GRANT some_privilege to some_role;

```
- Default priviliges.

### Under-the-hood

- psql, doesnt know about the database.
- psql/libpq - abstract network connections.
- Frontend/backend protocol - custom.
- Lexical analysis - yylex().
- Parsing - yyparse()
- Parse analysis - syntax checks, tables n columns exist, types match, system catalogs - result is modified parse tree.
- Rewriting - expand views and rules.
- Planning/Optimizing - takes in parse tree gives out execution plan.
- Plan tree
- Execution
- Access methods - sequential scan.
- Storage management - 8k pages.
- WAL logging - journaling.


## Extensions

- Every decade brings new workloads for databases.
- These are add-ons that you can install to extend functionality beyond base offerings.
- They allow you to leverage the database eco-systemand grow with it.
- Areas that are extensible.
  - Type system and operators
  - User defined functions and aggregates.
  - Storage system and indexes.
  - Write ahead logging and replication.
  - Transaction engine.
  - Background worker processes.
  - Query planner and query executer.
  - Configuration and database metadata.
- Type systems and UDF can be done in SQL, everything else needs to be done low level language like C.
