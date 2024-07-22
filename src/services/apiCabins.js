import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('Cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  let imagePath = typeof newCabin.image === 'string' ? newCabin.image : undefined;
  let imageName = '';

  if (!imagePath) {
    imageName = crypto.randomUUID().split('-')[0] + '-' + newCabin.image[0].name;

    const { error } = await supabase.storage.from('cabins').upload(imageName, newCabin.image[0]);

    if (error) throw new Error('Could not upload file');

    imagePath = supabaseUrl + '/storage/v1/object/public/cabins/' + imageName;
  }

  newCabin.image = imagePath;

  let query = supabase.from('Cabins');
  if (id) query = query.update(newCabin).eq('id', id);
  else query = query.insert([newCabin]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Could not create cabin');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('Cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
