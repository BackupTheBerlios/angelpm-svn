#!/usr/bin/python

# relay.py

from stompservice import StompClientFactory
from twisted.internet import reactor
from twisted.internet.task import LoopingCall
from random import random
from orbited import json
from SimpleXMLRPCServer import *

from threading import Thread
import stompservice

INTERVAL = 1000

class DataProducer(StompClientFactory):
    def recv_connected(self, msg):
        print 'Connected; producing data'
        self.timer = LoopingCall(self.test_data)
        self.timer.start(INTERVAL/1000.0)

    def send_data(self, channel, data):
        print "Transmitting: ", data
        # modify our data elements
        self.send(channel, json.encode(data))

    def test_data(self):
        # WHAT THE F***?
        pass

orbited_proxy = DataProducer()

class RPCServer(Thread):
    def __init__(self, orbited):
        self.orbited = orbited
        Thread.__init__(self)

    def run(self):
        class RequestHandler(SimpleXMLRPCRequestHandler):
            rpc_paths = ('/RPC2',)
        #create a server
        server = SimpleXMLRPCServer(("localhost",8045),
                requestHandler = RequestHandler)

        server.register_introspection_functions()
    
        def transmit_orbited(channel, message):
            self.orbited.send_data(channel, message)
            return ""

        server.register_function(transmit_orbited, 'transmit')
        server.serve_forever()

rpcthread = RPCServer(orbited_proxy)
rpcthread.start()

reactor.connectTCP('localhost', 61613, orbited_proxy)
reactor.run()
