import type { Playlist, Song } from "@/lib/data";

export async function getInfoPlaylist(id: string): Promise<{ playlist: Playlist, songs: Song[] }> {
  const response = await fetch(`/api/get-info-playlist.json?id=${id}`);
  return await response.json();
}
