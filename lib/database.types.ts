export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      announcements: {
        Row: {
          body: string;
          category: string;
          created_at: string;
          id: string;
          pinned: boolean;
          published: boolean;
          title: string;
          updated_at: string;
        };
        Insert: {
          body?: string;
          category?: string;
          created_at?: string;
          id?: string;
          pinned?: boolean;
          published?: boolean;
          title: string;
          updated_at?: string;
        };
        Update: {
          body?: string;
          category?: string;
          created_at?: string;
          id?: string;
          pinned?: boolean;
          published?: boolean;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      contacts: {
        Row: {
          email: string | null;
          id: string;
          is_emergency: boolean;
          location: string | null;
          name: string | null;
          phone: string | null;
          published: boolean;
          role: string | null;
          sort_order: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          email?: string | null;
          id?: string;
          is_emergency?: boolean;
          location?: string | null;
          name?: string | null;
          phone?: string | null;
          published?: boolean;
          role?: string | null;
          sort_order?: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          email?: string | null;
          id?: string;
          is_emergency?: boolean;
          location?: string | null;
          name?: string | null;
          phone?: string | null;
          published?: boolean;
          role?: string | null;
          sort_order?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      drivers: {
        Row: {
          available: boolean;
          id: string;
          name: string;
          phone: string;
          sort_order: number;
          type: string;
          updated_at: string;
        };
        Insert: {
          available?: boolean;
          id?: string;
          name: string;
          phone: string;
          sort_order?: number;
          type?: string;
          updated_at?: string;
        };
        Update: {
          available?: boolean;
          id?: string;
          name?: string;
          phone?: string;
          sort_order?: number;
          type?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          category: string;
          created_at: string;
          description: string;
          format: string | null;
          icon: string | null;
          id: string;
          location: string | null;
          prize: string | null;
          published: boolean;
          registration_url: string | null;
          sort_order: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          category?: string;
          created_at?: string;
          description?: string;
          format?: string | null;
          icon?: string | null;
          id?: string;
          location?: string | null;
          prize?: string | null;
          published?: boolean;
          registration_url?: string | null;
          sort_order?: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          description?: string;
          format?: string | null;
          icon?: string | null;
          id?: string;
          location?: string | null;
          prize?: string | null;
          published?: boolean;
          registration_url?: string | null;
          sort_order?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      faqs: {
        Row: {
          answer: string;
          category: string | null;
          created_at: string;
          embedding: string | null;
          helpful_count: number;
          id: string;
          keywords: string[];
          not_helpful_count: number;
          published: boolean;
          question: string;
          sort_order: number;
          source: string | null;
          tags: string[];
          updated_at: string;
        };
        Insert: {
          answer: string;
          category?: string | null;
          created_at?: string;
          embedding?: string | null;
          helpful_count?: number;
          id?: string;
          keywords?: string[];
          not_helpful_count?: number;
          published?: boolean;
          question: string;
          sort_order?: number;
          source?: string | null;
          tags?: string[];
          updated_at?: string;
        };
        Update: {
          answer?: string;
          category?: string | null;
          created_at?: string;
          embedding?: string | null;
          helpful_count?: number;
          id?: string;
          keywords?: string[];
          not_helpful_count?: number;
          published?: boolean;
          question?: string;
          sort_order?: number;
          source?: string | null;
          tags?: string[];
          updated_at?: string;
        };
        Relationships: [];
      };
      matches: {
        Row: {
          id: string;
          participant_a: string | null;
          participant_b: string | null;
          round: string | null;
          scheduled_at: string | null;
          score_a: number | null;
          score_b: number | null;
          sort_order: number;
          status: string;
          tournament_id: string;
          updated_at: string;
          winner: string | null;
        };
        Insert: {
          id?: string;
          participant_a?: string | null;
          participant_b?: string | null;
          round?: string | null;
          scheduled_at?: string | null;
          score_a?: number | null;
          score_b?: number | null;
          sort_order?: number;
          status?: string;
          tournament_id: string;
          updated_at?: string;
          winner?: string | null;
        };
        Update: {
          id?: string;
          participant_a?: string | null;
          participant_b?: string | null;
          round?: string | null;
          scheduled_at?: string | null;
          score_a?: number | null;
          score_b?: number | null;
          sort_order?: number;
          status?: string;
          tournament_id?: string;
          updated_at?: string;
          winner?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "matches_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "tournaments";
            referencedColumns: ["id"];
          },
        ];
      };
      question_logs: {
        Row: {
          answered: boolean;
          created_at: string;
          id: string;
          matched_faq_id: string | null;
          question: string;
        };
        Insert: {
          answered?: boolean;
          created_at?: string;
          id?: string;
          matched_faq_id?: string | null;
          question: string;
        };
        Update: {
          answered?: boolean;
          created_at?: string;
          id?: string;
          matched_faq_id?: string | null;
          question?: string;
        };
        Relationships: [
          {
            foreignKeyName: "question_logs_matched_faq_id_fkey";
            columns: ["matched_faq_id"];
            isOneToOne: false;
            referencedRelation: "faqs";
            referencedColumns: ["id"];
          },
        ];
      };
      schedule_items: {
        Row: {
          created_at: string;
          day_label: string;
          description: string | null;
          end_time: string | null;
          event_date: string | null;
          id: string;
          location: string | null;
          published: boolean;
          sort_order: number;
          start_time: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          day_label?: string;
          description?: string | null;
          end_time?: string | null;
          event_date?: string | null;
          id?: string;
          location?: string | null;
          published?: boolean;
          sort_order?: number;
          start_time?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          day_label?: string;
          description?: string | null;
          end_time?: string | null;
          event_date?: string | null;
          id?: string;
          location?: string | null;
          published?: boolean;
          sort_order?: number;
          start_time?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          key: string;
          updated_at: string;
          value: Json;
        };
        Insert: {
          key: string;
          updated_at?: string;
          value?: Json;
        };
        Update: {
          key?: string;
          updated_at?: string;
          value?: Json;
        };
        Relationships: [];
      };
      standings: {
        Row: {
          id: string;
          lost: number;
          note: string | null;
          participant: string;
          played: number;
          points: number;
          rank: number | null;
          sort_order: number;
          tournament_id: string;
          updated_at: string;
          won: number;
        };
        Insert: {
          id?: string;
          lost?: number;
          note?: string | null;
          participant: string;
          played?: number;
          points?: number;
          rank?: number | null;
          sort_order?: number;
          tournament_id: string;
          updated_at?: string;
          won?: number;
        };
        Update: {
          id?: string;
          lost?: number;
          note?: string | null;
          participant?: string;
          played?: number;
          points?: number;
          rank?: number | null;
          sort_order?: number;
          tournament_id?: string;
          updated_at?: string;
          won?: number;
        };
        Relationships: [
          {
            foreignKeyName: "standings_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "tournaments";
            referencedColumns: ["id"];
          },
        ];
      };
      tournaments: {
        Row: {
          champion: string | null;
          created_at: string;
          description: string | null;
          format: string;
          game: string | null;
          id: string;
          name: string;
          prize: string | null;
          sort_order: number;
          status: string;
          updated_at: string;
        };
        Insert: {
          champion?: string | null;
          created_at?: string;
          description?: string | null;
          format?: string;
          game?: string | null;
          id?: string;
          name: string;
          prize?: string | null;
          sort_order?: number;
          status?: string;
          updated_at?: string;
        };
        Update: {
          champion?: string | null;
          created_at?: string;
          description?: string | null;
          format?: string;
          game?: string | null;
          id?: string;
          name?: string;
          prize?: string | null;
          sort_order?: number;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      venue_locations: {
        Row: {
          description: string | null;
          icon: string | null;
          id: string;
          sort_order: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          description?: string | null;
          icon?: string | null;
          id?: string;
          sort_order?: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          description?: string | null;
          icon?: string | null;
          id?: string;
          sort_order?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Row"];
export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"];

// Convenience row aliases used across the app.
export type Announcement = Tables<"announcements">;
export type Contact = Tables<"contacts">;
export type Driver = Tables<"drivers">;
export type EventItem = Tables<"events">;
export type Faq = Tables<"faqs">;
export type Match = Tables<"matches">;
export type ScheduleItem = Tables<"schedule_items">;
export type Standing = Tables<"standings">;
export type Tournament = Tables<"tournaments">;
export type VenueLocation = Tables<"venue_locations">;
export type Setting = Tables<"settings">;
