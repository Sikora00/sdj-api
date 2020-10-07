export interface SlackChannel {
  created: number;
  creator: string;
  id: string;
  is_archived: boolean;
  is_channel: boolean;
  is_general: boolean;
  is_member: boolean;
  is_mpim: boolean;
  is_org_shared: boolean;
  is_private: boolean;
  is_shared: boolean;
  members: string[];
  name: string;
  name_normalized: string;
  num_members: number;
  previous_names: string[];
  purpose: any;
  topic: any;
  unlinked: number;
}
