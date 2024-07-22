import supabase, { supabaseUrl } from './supabase';

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { fullName, avatar: '' } } });

  if (error) throw new Error(error.message);

  return data;
}

//

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);

  return data;
}

//

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

//

export async function updateUser({ password, fullName, avatar }) {
  const updateData = password ? { password } : { data: { fullName } };

  // 1) Uploading user data
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2) Uploading user avatar
  const filename = crypto.randomUUID() + avatar.name;
  const { error: uploadError } = await supabase.storage.from('avatars').upload(filename, avatar);
  if (uploadError) throw uploadError;

  // 3) Updating user data with current user avatar
  const fileUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${filename}`;
  const { data: data2, error: error2 } = await supabase.auth.updateUser({ data: { avatar: fileUrl } });
  if (error2) throw new Error(error2.message);

  return data2;
}

//

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
