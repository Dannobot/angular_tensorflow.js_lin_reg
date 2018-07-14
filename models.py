# coding=utf-8

from django.db import models

# Create your models here.


class Country(models.Model):

    count_name = models.CharField(max_length=40, verbose_name=u'Країни')

    class Meta:
        verbose_name = u'країну'
        verbose_name_plural = u'Країни'

    def __unicode__(self):
        return self.count_name


class Cities(models.Model):

    city = models.CharField(max_length=40, verbose_name=u'Міста')
    country = models.ForeignKey('Country', related_name='cities', on_delete=models.CASCADE, verbose_name=u'Країна')
    image = models.ImageField(blank=True, upload_to='city', verbose_name=u'Аватарка міста')

    def __unicode__(self):
        return self.city

    class Meta:
        verbose_name = u'місто'
        verbose_name_plural = u'Міста'
