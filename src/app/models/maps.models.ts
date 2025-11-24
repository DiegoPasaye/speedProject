export interface MapWikiItem {
  map_id: string;
  name: string;
  cost_to_unlock: number;
  world_record: number;
  total_players: number;
  unlocked: boolean;
  personal_record: number;
  total_owners: number;

  image?: string;
  description?: string;
  difficulty?: string;
  features?: string[];
}
