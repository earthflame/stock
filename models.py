#from django.db import models

# Create your models here.
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jul 19 10:47:07 2017

@author: cjx
"""
from mongoengine import connect,StringField,Document,BooleanField,DictField,ListField


def lazy_connect():
    connect('kchart',host = '127.0.0.1', port = 27017)

lazy_connect()


class Equities(Document):
    meta = {'collection' : 'equities'}
    code = StringField()
    company = StringField()
    country = StringField()
    country_code = StringField()
    isin = StringField()
    currid = StringField(unique=True)
    smlID = StringField()
    link = StringField()
    already_download = BooleanField(default = False)
    alreadysave = BooleanField(default = False)
    行业 = StringField()
    员工 = StringField()
    资产负债表 = DictField()
    利润表 = DictField()
    现金流 = DictField()
    比率 = DictField()
    红利 = ListField()
    财报 = ListField(DictField())
    price = ListField()

class Commodities(Document):
    meta = {'collection' : 'commodities'}
    code = StringField()
    commodity = StringField()
    currid = StringField(unique=True)
    smlID = StringField()
    link = StringField()
    already_download = BooleanField(default = False)

class Currencies(Document):
    meta = {'collection' : 'currencies'}
    code = StringField()
    currency = StringField()
    currid = StringField(unique=True)
    smlID = StringField()
    link = StringField()
    already_download = BooleanField(default = False)

class Indies(Document):
    meta = {'collection' : 'indies'}
    code = StringField()
    index = StringField()
    currid = StringField(unique=True)
    smlID = StringField()
    link = StringField()
    already_download = BooleanField(default = False)

class Last(Document):
    meta = {'collection' : 'last'}
    user = StringField()
    lastfive = ListField()







