import { supabase } from './supabase';
import { ContactMessage } from '@/app/types/contact';

export async function insertContactMessage(message: ContactMessage) {
  // 1. Save to Supabase database
  const { data, error } = await supabase
    .from('contacts')
    .insert([{
      name: message.name,
      email: message.email,
      message: message.message,
      created_at: new Date().toISOString()
    }])
    .select();
  
  if (error) {
    console.error('Error inserting contact message:', error);
    throw error;
  }
  
  // 2. Send email notification via Resend
  try {
    const response = await fetch('/api/send-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: message.name,
        email: message.email,
        message: message.message,
      }),
    });
    
    if (!response.ok) {
      console.error('Failed to send email notification');
    } else {
      console.log('Email sent successfully via Resend');
    }
  } catch (emailError) {
    console.error('Email sending error:', emailError);
    // Don't throw - contact is already saved to database
  }
  
  return data;
}
