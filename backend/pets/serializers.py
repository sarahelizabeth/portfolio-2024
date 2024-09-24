from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers

from .models import Pet, PetImage, PetPic

class PetImageSerializer(serializers.ModelSerializer):
  pet_type = serializers.SerializerMethodField()

  def get_pet_type(self, pet_image):
    return pet_image.pet.pet_type
  
  class Meta:
    model = PetImage
    fields = ('image', 'pet', 'title', 'pet_type')

class PetSerializer(serializers.ModelSerializer):
  images = serializers.SerializerMethodField()

  def get_images(self, pet):
    return PetImageSerializer(pet.images.all(), many=True).data
  
  class Meta:
    model = Pet
    fields = ('pk', 'pet_type', 'owner', 'name', 'breed', 'birthday', 'images',)

class PetPicSerializer(serializers.ModelSerializer):
  owner_name = serializers.SerializerMethodField()

  def get_owner_name(self, pet_pic):
    first = pet_pic.owner.first_name
    lastInitial = pet_pic.owner.last_name[0]
    return first + ' ' + lastInitial + '.'
  class Meta:
    model = PetPic
    fields = ('id', 'pet_type', 'image', 'owner', 'owner_name', 'name', 'breed', 'birthday', 'created_at',)

  def to_representation(self, instance):
    representation = super().to_representation(instance)
    representation['owner'] = UserDetailsSerializer(instance.owner, many=False).data
    return representation
