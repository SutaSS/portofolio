// Contoh cara menggunakan Supabase di aplikasi Next.js Anda

// 1. Import Supabase client
import { supabase } from '@/lib/supabase';

// 2. Contoh: Mengambil data dari tabel
export async function getAchievements() {
  const { data, error } = await supabase
    .from('achievements') // nama tabel Anda
    .select('*');
  
  if (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
  
  return data;
}

// 3. Contoh: Menambahkan data baru
export async function addAchievement(achievement: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('achievements')
    .insert([achievement])
    .select();
  
  if (error) {
    console.error('Error adding achievement:', error);
    return null;
  }
  
  return data;
}

// 4. Contoh: Update data
export async function updateAchievement(id: string, updates: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('achievements')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating achievement:', error);
    return null;
  }
  
  return data;
}

// 5. Contoh: Delete data
export async function deleteAchievement(id: string) {
  const { error } = await supabase
    .from('achievements')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting achievement:', error);
    return false;
  }
  
  return true;
}

// 6. Contoh: Upload file ke Storage
export async function uploadImage(file: File, bucket: string = 'images') {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

// 7. Contoh: Realtime subscription
export function subscribeToAchievements(callback: (payload: unknown) => void) {
  const channel = supabase
    .channel('achievements-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'achievements'
      },
      callback
    )
    .subscribe();

  return channel;
}

// 8. Contoh penggunaan di Component
/*
'use client';
import { useEffect, useState } from 'react';
import { getAchievements } from '@/lib/supabase-helpers';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAchievements();
      setAchievements(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {achievements.map((achievement) => (
        <div key={achievement.id}>{achievement.title}</div>
      ))}
    </div>
  );
}
*/
