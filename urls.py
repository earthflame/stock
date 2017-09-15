#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jun 15 20:45:40 2017

@author: cjx
"""

from django.conf.urls import url
from . import views

urlpatterns = [
        url(r'^home',views.home,name = 'home'),
        url(r'^login',views.mylogin,name = 'login'),
        url(r'^register',views.myregister,name = 'register'),
        url(r'^logout/$',views.mylogout,name = 'logout'),
        url(r'^stock/(?P<exchange_code>[\w]+-[A-Za-z]+)',views.stock,name = 'stock'),
        url(r'^chart',views.chart,name = 'chart'),
        url(r'^search',views.search,name = 'search'),
        url(r'^save_search',views.save_search,name = 'save_search'),
        url(r'^show_search',views.show_search,name = 'show_search'),
        ]