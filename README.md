# Synchrotron

Aims to become a way to break free of streaming music services' shortcomings in playlist management.

The idea is to reason about songs, albums etc as having an arbitrary number of string-based tags, e.g. Michael Jackson's song "Beat It" has tags "groovy", "neat".
This data can then be rendered to a playlist structure into a streaming service. Configuration should allow for importing updates from the user's "primary" streaming service, e.g. Spotify. So changes there, can be rendered into playlists elsewhere.

## Milestones

Subject to change as I realise how silly or naive I am.

### 1. Initial scope

- Database w tag 1<->\* songs/recordings
- Output JSON files e.g. `{ "tag1": ["song1", "song2"] }`

### 2. Spotify I

- Import a user's existing Spotify playlists, tag based on playlist paths
- Render new playlists with names based on tags in some Spotify folder

### 3. Spotify II

- Rsync-style CRUD sync of rendered Spotify playlists

### 4. Tidal

- Synchronise rendered playlists (delete songs that shouldn't be there, etc)
- Render to Tidal

## Challenges to solve

- [ ] Managing mismatches between music services' different song IDs etc

## Development

Need an env file (see .env.example and hope it's up to date)

To start the development server run:

```sh
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
